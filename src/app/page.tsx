"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";

/* =========================
   PAGE
========================= */

export default function Page() {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Generation started");
        setValue("");
      },
      onError: () => toast.error("Failed to start generation"),
    })
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#ECF4E8] text-[#2F4F3A]">
      {/* =========================
          SUBTLE NOISE BACKGROUND
      ========================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* =========================
          CONTENT
      ========================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28">
        {/* Meta */}
        <div className="flex justify-center mb-12">
          <div className="rounded-full border border-[#ABE7B2] bg-[#ECF4E8] px-6 py-2 text-sm font-medium tracking-wide">
            AI APPLICATION INTERFACE
          </div>
        </div>

        {/* Hero */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none">
            BUILD
            <span className="block text-[#2F6B4F]">WITH INTENT</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-[#2F4F3A]/80">
            A calm, structured interface for turning ideas into
            production-ready applications.
            <span className="ml-2 bg-[#CBF3BB] px-2 py-0.5 font-semibold text-[#2F4F3A]">
              CLEAN. MODULAR. RELIABLE.
            </span>
          </p>
        </div>

        {/* Prompt */}
        <div className="mt-20 max-w-3xl mx-auto space-y-6">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Describe the application you want to generate…"
            disabled={invoke.isPending}
            className="min-h-[160px] resize-none rounded-xl border-2 border-[#ABE7B2] bg-[#ECF4E8] p-6 text-base text-[#2F4F3A] placeholder:text-[#2F4F3A]/50 focus-visible:ring-0 focus-visible:border-[#2F6B4F]"
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#2F4F3A]/60">
              Secure background execution
            </span>

            <Button
              size="lg"
              disabled={!value.trim() || invoke.isPending}
              onClick={() => invoke.mutate({ value })}
              className="rounded-full bg-[#2F6B4F] text-white px-8 gap-2 hover:bg-[#2F6B4F]/90"
            >
              Start Building
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ABE7B2] text-[#2F4F3A]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}



// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useTRPC } from "@/trpc/client";
// import { useMutation } from "@tanstack/react-query";
// import { useState } from "react";
// import { toast } from "sonner";

// const Page = () => {
//   const [value, setValue] = useState("");
//   const trpc = useTRPC();
//   const invoke = useMutation(
//     trpc.invoke.mutationOptions({
//       onSuccess: () => toast.success("Background Job Started"),
//     })
//   );
//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <Input value={value} onChange={(e) => setValue(e.target.value)} />
//       <Button
//         disabled={invoke.isPending}
//         onClick={() => invoke.mutate({ value: value })}
//       >
//         Invoke Background Button
//       </Button>
//     </div>
//   );
// };
// export default Page;
