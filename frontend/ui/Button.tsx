'use client';
import { InterfaceButtonSubmit } from "@/types";

export const ButtonSubmit = ({ children }: InterfaceButtonSubmit) => {
    return (
        <button type="submit" className="w-max px-12 py-2 my-5 rounded-3xl bg-[rgba(255,255,255,0.5)] cursor-pointer">{children}</button>
    )
}