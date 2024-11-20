import { NextRequest, NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
import { ICartItem } from "@/types/index";
import Stripe from "stripe";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try {
        const { cart, customer } = await req.json();
        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
            apiVersion: "2024-09-30.acacia",
            typescript: true,
        });

        if (!cart || !customer) {
            return new NextResponse("Not enough data to checkout", {
                status: 400,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cart.map((cartItem: ICartItem) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: cartItem.accommodation.title,
                        metadata: {
                            accommodationId: cartItem.accommodation.id,
                            startDate: cartItem.startDate,
                            endDate: cartItem.endDate,
                        },
                    },
                    unit_amount: cartItem.accommodation.price * 100,
                },
                quantity: cartItem.quantity,
            })),
            client_reference_id: customer.clerkId,
            success_url: `${process.env.HOTEL_URL}/booking-success`,
            cancel_url: `${process.env.HOTEL_URL}/cart`,
        });

        return NextResponse.json(session, { headers: corsHeaders });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
