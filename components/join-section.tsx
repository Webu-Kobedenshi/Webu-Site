"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
    { text: "Googleフォームで応募", sub: "01. Interest" },
    { text: "Discordに参加", sub: "02. Contact" },
    { text: "自己紹介", sub: "03. Join" },
];

export function JoinSection() {
    return (
        <section className="bg-background py-16 sm:py-24 md:py-32 px-4 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 sm:mb-14 md:mb-20 relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6"
                    >
                        Process
                    </motion.span>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tight"
                    >
                        JOIN FLOW
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm sm:text-base md:text-lg text-muted-foreground"
                    >
                        We部への参加までの3ステップ
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.2 }}
                            className="relative group p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] bg-foreground/5 hover:bg-foreground/10 transition-colors border border-foreground/5 backdrop-blur-sm"
                        >
                            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-4xl sm:text-5xl md:text-6xl font-black text-foreground/5 group-hover:text-primary/20 transition-colors select-none">
                                {idx + 1}
                            </div>
                            <div className="relative z-10">
                                <span className="block text-primary font-mono text-xs sm:text-sm mb-2 sm:mb-4 font-bold">{step.sub}</span>
                                <p className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed">{step.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 sm:mt-14 md:mt-20 text-center relative z-10"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 sm:gap-3 bg-primary text-primary-foreground px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 rounded-full text-base sm:text-lg md:text-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/20"
                    >
                        話を聞きたい！
                        <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>
                </motion.div>

                {/* Background Decorations */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none opacity-50" />
            </div>
        </section>
    );
}
