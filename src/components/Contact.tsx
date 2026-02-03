export default function Contact() {
    return (
        <section
            id="contact"
            className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-purple-400 to-black text-white"
            data-color="bg-black"
            data-text-color="text-white"
        >
            <div className="max-w-2xl w-full space-y-8">
                {/* Title */}
                <h2 className="text-5xl font-bold">Let’s Work Together</h2>

                <p className="text-lg text-white/80">
                    I'm open to Software Engineering, ML/AI and Full-Stack
                    opportunities. Feel free to reach out, I'd love to connect.
                </p>

                {/* Contact buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* Email */}
                    <a
                        href="mailto:oribaruch15@gmail.com"
                        className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition"
                    >
                        Email Me
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/ori-b-ml/"
                        target="_blank"
                        className="px-6 py-3 rounded-xl border border-white hover:bg-white hover:text-black transition"
                    >
                        LinkedIn
                    </a>
                    {/* Download CV */}
                    <a
                        href="/portfolio/ORI_BARUCH.pdf"
                        download
                        className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition"
                    >
                        Download CV
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/vcuxvdsuk"
                        target="_blank"
                        className="px-6 py-3 rounded-xl border border-white hover:bg-white hover:text-black transition"
                    >
                        GitHub
                    </a>
                </div>

                {/* Footer small text */}
                <p className="text-sm text-white/50 pt-10">
                    © {new Date().getFullYear()} Ori Baruch
                </p>
            </div>
        </section>
    );
}
