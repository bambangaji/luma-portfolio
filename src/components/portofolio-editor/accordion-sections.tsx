import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const AccordionSection = ({
    title,
    subtitle,
    children,
    defaultOpen = true,
}: Props) => {
    const [open, setOpen] =
        useState(defaultOpen);

    return (
        <motion.div
            layout
            className="
        overflow-hidden
        rounded-2xl

        border
        border-gray-200

        bg-white

        shadow-sm

        dark:border-gray-800
        dark:bg-gray-900
      "
        >
            <button
                onClick={() => setOpen(!open)}
                className="
    flex
    w-full
    items-center
    justify-between

    px-4
    py-3

    hover:bg-gray-50

    dark:hover:bg-gray-800/50
  "
            >
                <div
                    className="
      flex
      items-center
      gap-3
    "
                >
                    <h3
                        className="
        text-sm
        font-semibold

        text-slate-900
        dark:text-white
      "
                    >
                        {title}
                    </h3>

                    {subtitle && (
                        <span
                            className="
          text-xs
          text-slate-500
          dark:text-slate-400
        "
                        >
                            {subtitle}
                        </span>
                    )}
                </div>

                <ChevronDown
                    size={16}
                    className={`
      transition-transform
       text-slate-500
          dark:text-slate-400
      ${open ? 'rotate-180' : ''}
    `}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: 'auto',
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="
              overflow-hidden
            "
                    >
                        <div
                            className="
                border-t

                border-gray-100

                p-5

                dark:border-gray-800
              "
                        >
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};