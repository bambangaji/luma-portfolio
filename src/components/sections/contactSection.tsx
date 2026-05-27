import { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "./sectionTitle";
import { LandingPageService } from "../../services/landingPageService";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react';

const contactConfig = {
  email: {
    label: 'Email',
    icon: Mail,
  },

  whatsapp: {
    label: 'WhatsApp',
    icon: MessageCircle,
  },

  linkedin: {
    label: 'LinkedIn',
    icon: Linkedin,
  },

  github: {
    label: 'GitHub',
    icon: Github,
  },

  resume: {
    label: 'Resume',
    icon: Download,
  },
};
export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const contacts = LandingPageService.getContactInfo();
  console.log("Contact Info:", contacts);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSent(true);

    setTimeout(() => {
      setSent(false);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="
        py-24
        bg-white dark:bg-gray-900
        transition-colors duration-300
      "
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          title="Get in Touch"
          subtitle="Let's discuss how we can collaborate on your next AI project"
        />

        <div className="grid gap-4">
          {contacts.map((item) => {
            const config = contactConfig[item.type];

            const Icon = config.icon;

            return (
              <motion.a
                key={item.type}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                className="
          group flex items-center justify-between
          rounded-2xl border p-5
          transition-all duration-300

          border-gray-200 bg-white
          hover:border-violet-300
          hover:shadow-xl

          dark:border-gray-800
          dark:bg-gray-800/50
          dark:hover:border-violet-500/40
        "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
              rounded-xl p-3

              bg-violet-100
              dark:bg-gray-700
            "
                  >
                    <Icon
                      className="
                h-5 w-5
                text-violet-600 dark:text-cyan-400
              "
                    />
                  </div>

                  <div>
                    <div
                      className="
                font-semibold
                text-slate-900 dark:text-white
              "
                    >
                      {config.label}
                    </div>

                    <div
                      className="
                text-sm
                text-slate-500 dark:text-slate-400
              "
                    >
                      {item.value}
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="
            text-slate-400
            transition-colors
            group-hover:text-violet-500
          "
                >
                  →
                </motion.div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};