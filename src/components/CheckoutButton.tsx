
"use client";

import { Button } from "./ui/button";
import { useState } from "react";

interface CheckoutButtonProps {
    bookId: number;
    price: number;
    title: string;
}

export default function CheckoutButton({ bookId, price, title }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        // Placeholder for Stripe Checkout logic
        console.log(`Initiating checkout for book ${bookId}: ${title} ($${price / 100})`);

        // Simulate network delay
        setTimeout(() => {
            setLoading(false);
            alert("Redirecting to Stripe Checkout... (Integration Pending)");
        }, 1000);
    };

    return (
        <Button
            size="lg"
            className="w-full text-lg h-12"
            onClick={handleCheckout}
            disabled={loading}
        >
            {loading ? "Processing..." : "Buy Now"}
        </Button>
    );
}
