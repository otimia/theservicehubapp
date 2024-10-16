"use client"
import React from "react";
import { Button } from "./button";
import { RefreshCcw } from "lucide-react";

interface RefreshBtnProps {
    icon: string;
    variant: "outline" | "default" | "destructive" | "secondary" | "ghost" | "link";
}

const RefreshBtn: React.FC<RefreshBtnProps> = ({ icon, variant }) => {
    return (
        <Button variant={variant}>
            {icon === "refresh-ccw" && <RefreshCcw className="h-4 w-4" />}
        </Button>
    );
};

export default RefreshBtn;