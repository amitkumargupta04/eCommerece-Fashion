import React from "react";
import { Globe, RotateCcw, Headphones, ShieldCheck } from "lucide-react";

export default function OurProcess() {
  const features = [
    {
      icon: Globe,
      title: "Global Express Delivery",
      description:
        "Complimentary expedited shipping on premium orders with full end-to-end telemetry tracking.",
    },
    {
      icon: RotateCcw,
      title: "Seamless 30-Day Returns",
      description:
        "Complimentary courier pickup and instant store credit or full refund on all returns.",
    },
    {
      icon: Headphones,
      title: "24/7 VIP Concierge",
      description:
        "Our dedicated fashion advisors are available round-the-clock for styling and order support.",
    },
    {
      icon: ShieldCheck,
      title: "100% Authentic Guarantee",
      description:
        "Direct manufacturer sourcing and verified authentic luxury certification on every piece.",
    },
  ];

  return (
    <section className="w-full my-12 bg-neutral-950 border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-black border border-white/30 text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide mb-2">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
