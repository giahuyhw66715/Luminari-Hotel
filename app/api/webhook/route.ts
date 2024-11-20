import { NextRequest, NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
import prisma from "@/lib/db";
import Stripe from "stripe";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

export const POST = async (req: NextRequest) => {
    try {
        const rawBody = await req.text();
        // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
            apiVersion: "2024-09-30.acacia",
            typescript: true,
        });
        const signature = req.headers.get("Stripe-Signature") as string;

        const event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const customerInfo = {
                clerkId: session?.client_reference_id,
                name: session?.customer_details?.name,
                email: session?.customer_details?.email,
            };

            const retrieveSession = await stripe.checkout.sessions.retrieve(
                session.id,
                { expand: ["line_items.data.price.product"] }
            );

            const lineItems = retrieveSession?.line_items?.data;

            await prisma.booking.create({
                data: {
                    customerClerkId: customerInfo.clerkId || "",
                    bookingItems: {
                        create:
                            lineItems?.map((item: any) => {
                                return {
                                    accommodation: {
                                        connect: {
                                            id: item.price.product.metadata
                                                .accommodationId,
                                        },
                                    },
                                    startDate:
                                        item.price.product.metadata.startDate,
                                    endDate:
                                        item.price.product.metadata.endDate,
                                    quantity: item.quantity,
                                };
                            }) || [],
                    },
                    method: "CARD",
                    total: session.amount_total
                        ? session.amount_total / 100
                        : 0,
                },
            });
        }

        return new NextResponse("Booking created", { status: 200 });
    } catch (err) {
        console.log("[webhooks_POST]", err);
        return new NextResponse("Failed to create the booking", {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
};
