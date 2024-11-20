import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICartItem } from "../types/index";
import { toast } from "sonner";

interface ICartState {
    cart: ICartItem[];
    total: number;
    addToCart: (item: ICartItem) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    setDuration: (
        id: string,
        startDate: Date | undefined,
        endDate: Date | undefined
    ) => void;
    getTotal: () => void;
    clearCart: () => void;
}
export const useCartStore = create<ICartState>()(
    persist(
        (set, get) => ({
            cart: [],
            total: 0,
            addToCart: (item: ICartItem) => {
                const cart = get().cart;
                const isExisting = cart.find(
                    (cartItem) =>
                        cartItem.accommodation.id === item.accommodation.id
                );

                if (isExisting) {
                    // If is existing, update quantity
                    get().increaseQuantity(item.accommodation.id);
                } else {
                    // If not existing, add new one
                    set({ cart: [...cart, item] });
                }
                get().getTotal();
                toast.success("Added to cart successfully");
            },
            removeFromCart: (id: string) => {
                set({
                    cart: get().cart.filter(
                        (item) => item.accommodation.id !== id
                    ),
                });
                get().getTotal();
            },
            increaseQuantity: (id: string) => {
                set({
                    cart: get().cart.map((item) =>
                        item.accommodation.id === id
                            ? {
                                  ...item,
                                  quantity: item.quantity + 1,
                              }
                            : item
                    ),
                });
                get().getTotal();
            },
            decreaseQuantity: (id: string) => {
                set({
                    cart: get().cart.map((item) =>
                        item.accommodation.id === id
                            ? {
                                  ...item,
                                  quantity:
                                      item.quantity > 1 ? item.quantity - 1 : 1,
                              }
                            : item
                    ),
                });
                get().getTotal();
            },
            setDuration: (id, startDate, endDate) => {
                set({
                    cart: get().cart.map((item) =>
                        item.accommodation.id === id
                            ? {
                                  ...item,
                                  startDate,
                                  endDate,
                              }
                            : item
                    ),
                });
                get().getTotal();
            },
            getTotal: () => {
                const cart = get().cart;
                let total = 0;
                cart.forEach((item) => {
                    total += item.quantity * item.accommodation.price;
                });
                set({ total });
                // return total;
            },
            clearCart: () => {
                set({ cart: [], total: 0 });
            },
        }),
        {
            name: "cart-storage",
        }
    )
);
