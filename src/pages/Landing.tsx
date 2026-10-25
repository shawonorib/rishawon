import landscape from "@/assets/data-landscape.jpg";
import resumePdf from "@/assets/Rakibul-Islam-Shawon-Profile.pdf?url";
import { PortfolioChart } from "@/components/PortfolioCharts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projects, type PortfolioProject } from "@/lib/portfolio";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Code2,
  Database,
  FileSpreadsheet,
  MapPin,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

function downloadText(filename: string, content: string) {
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Landing() {
  const { theme, setTheme } = useTheme();
  const [filter, setFilter] = useState("All projects");
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [contact, setContact] = useState(false);
  const [menu, setMenu] = useState(false);
  const [year, setYear] = useState("2025");
  const [activeSection, setActiveSection] = useState("Home");
  const [saved, setSaved] = useState(false);
  const [coordinates, setCoordinates] = useState("90.0000° N · 180.0000° E");
  const hero = useRef<HTMLElement>(null);
  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const latitude = 23.8103;
    const longitude = 90.4125;
    const finalCoordinates = `${latitude.toFixed(4)}° N · ${longitude.toFixed(4)}° E`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCoordinates(finalCoordinates);
      return;
    }

    const duration = 1600;
    let animationFrame = 0;
    let startTime: number | undefined;

    const animateCoordinates = (time: number) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      const currentLatitude = 90 + (latitude - 90) * easedProgress;
      const currentLongitude = 180 + (longitude - 180) * easedProgress;

      setCoordinates(
        `${currentLatitude.toFixed(4)}° N · ${currentLongitude.toFixed(4)}° E`,
      );

      if (progress < 1)
        animationFrame = requestAnimationFrame(animateCoordinates);
    };

    animationFrame = requestAnimationFrame(animateCoordinates);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    page.current
      ?.querySelectorAll(".reveal, section[id]")
      .forEach((element) => observer.observe(element));

    let animationFrame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const sections = Array.from(
          page.current?.querySelectorAll<HTMLElement>("section[id]") ?? [],
        );
        const headerHeight =
          document.querySelector(".portfolio-header")?.getBoundingClientRect()
            .height ?? 76;
        const activationLine = window.scrollY + headerHeight + 24;
        let currentSection = sections[0];

        for (const section of sections) {
          if (section.offsetTop <= activationLine) currentSection = section;
          else break;
        }

        const isAtPageBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        if (isAtPageBottom) currentSection = sections[sections.length - 1];

        if (currentSection) {
          const name =
            currentSection.id === "home"
              ? "Home"
              : currentSection.id.charAt(0).toUpperCase() +
                currentSection.id.slice(1);
          setActiveSection((active) => (active === name ? active : name));
        }
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const navigate = (section: string) => {
    setMenu(false);
    setActiveSection(section);
  };
  const toolItems = [
    { icon: Database, name: "SQL" },
    { icon: Code2, name: "Python" },
    { icon: BarChart3, name: "Power BI" },
    { icon: Sparkles, name: "Tableau" },
    { icon: FileSpreadsheet, name: "Excel" },
  ];
  const resume = () => {
    const link = document.createElement("a");
    link.href = resumePdf;
    link.download = "Rakibul-Islam-Shawon-Profile.pdf";
    link.click();
  };

  return (
    <div
      ref={page}
      className="portfolio min-h-screen bg-background text-foreground"
    >
      <header className="portfolio-header sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="portfolio-container flex h-[76px] items-center justify-between gap-4">
          <a
            href="#home"
            onClick={() => navigate("Home")}
            className="brand flex items-center gap-3"
            aria-label="Shawon home"
          >
            <span className="brand-mark">
              s<span>.</span>
            </span>
            <span className="font-semibold text-base">
              shawon<span className="text-primary">.</span>
            </span>
          </a>
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-8"
          >
            {["Home", "Projects", "About", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => navigate(item)}
                className={`nav-link ${activeSection === item ? "active" : ""}`}
                aria-current={activeSection === item ? "location" : undefined}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle color theme"
              title="Toggle color theme"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>
            <Button
              onClick={() => setContact(true)}
              className="mint-button hidden sm:inline-flex"
            >
              Let’s talk <ArrowUpRight />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menu && (
          <nav aria-label="Mobile navigation" className="mobile-navigation">
            {["Home", "Projects", "About", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => navigate(item)}
                className={activeSection === item ? "active" : ""}
                aria-current={activeSection === item ? "location" : undefined}
              >
                {item}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section
          id="home"
          ref={hero}
          className="portfolio-hero relative overflow-hidden"
          onPointerMove={(event) => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
              return;
            const bounds = event.currentTarget.getBoundingClientRect();
            hero.current?.style.setProperty(
              "--pan-x",
              `${(event.clientX - bounds.left - bounds.width / 2) * 0.012}px`,
            );
            hero.current?.style.setProperty(
              "--pan-y",
              `${(event.clientY - bounds.top - bounds.height / 2) * 0.012}px`,
            );
          }}
          onPointerLeave={() => {
            hero.current?.style.setProperty("--pan-x", "0px");
            hero.current?.style.setProperty("--pan-y", "0px");
          }}
        >
          <img
            className="hero-landscape"
            src={landscape}
            alt="Mint wireframe terrain visualizing a landscape of data"
            width={1920}
            height={1024}
          />
          <div className="hero-shade" />
          <div className="portfolio-container relative z-10 hero-content">
            <div className="hero-intro">
              <div className="availability">
                <span className="status-dot" /> OPEN TO OPPORTUNITIES
              </div>
              <p className="hero-greeting">Hello, I’m</p>
              <h1>
                Rakibul Islam
                <br />
                Shawon<span className="text-primary">.</span>
              </h1>
              <div className="hero-role">
                <span className="role-line" />
                Data Analyst <span className="role-separator">/</span> Problem
                Solver
              </div>
              <p className="hero-description">
                I turn complex data into clear insights.
                <br />
                Connecting the dots between numbers and
                <br className="hidden sm:block" /> better business decisions.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button asChild className="mint-button h-12 px-5">
                  <a href="#projects" onClick={() => navigate("Projects")}>
                    Explore my work <ArrowUpRight />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="hero-resume h-12 px-5"
                  onClick={resume}
                >
                  <ArrowDownToLine /> Profile Resume
                </Button>
              </div>
            </div>
            <div className="data-annotation" aria-hidden="true">
              <span className="annotation-cross">+</span>
              <div>
                <span className="annotation-label">FROM DATA TO DECISIONS</span>
                <p>Every number has a story.</p>
              </div>
            </div>
            <div className="hero-bottom">
              <span className="flex items-center gap-2">
                <MapPin size={13} /> Based in Bangladesh{" "}
                <span className="sample-location">· sample profile</span>
              </span>
              <a
                href="#projects"
                className="scroll-link"
                onClick={() => navigate("Projects")}
              >
                SCROLL TO EXPLORE <ArrowDown size={14} />
              </a>
              <span
                className="hero-coordinate"
                aria-label="23.8103 degrees north, 90.4125 degrees east"
                aria-live="off"
              >
                {coordinates}
              </span>
            </div>
          </div>
        </section>

        <div className="tool-strip border-y border-border">
          <div className="portfolio-container tool-strip-inner">
            <span className="tool-strip-caption">
              THE TOOLS BEHIND
              <br />
              THE INSIGHTS
            </span>
            <div className="tool-strip-viewport">
              <div className="tool-strip-track">
                {[false, true].map((isDuplicate) => (
                  <div
                    key={isDuplicate ? "duplicate" : "original"}
                    className="tool-strip-group"
                    aria-hidden={isDuplicate || undefined}
                  >
                    {toolItems.map(({ icon: Icon, name }) => (
                      <div key={name} className="tool-logo">
                        <Icon aria-hidden="true" />
                        {name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section id="projects" className="section-space portfolio-container">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">
                <span>01</span> SELECTED WORK
              </p>
              <h2>
                Data. Insight.{" "}
                <span className="text-muted-foreground">Impact.</span>
              </h2>
            </div>
            <p className="section-description">
              A selection of analytical explorations.
              <br />
              Real-world questions, data-driven answers.
            </p>
          </div>
          <div className="project-toolbar reveal">
            <div
              className="project-filters"
              role="group"
              aria-label="Filter projects"
            >
              {["All projects", "Power BI", "Python", "SQL"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  aria-pressed={filter === item}
                  className={`filter-button ${filter === item ? "selected" : ""}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                  {item === "All projects" && (
                    <span className="filter-count">03</span>
                  )}
                </Button>
              ))}
            </div>
            <span className="sample-note">ILLUSTRATIVE CASE STUDIES</span>
          </div>
          <div className="project-grid">
            {projects
              .filter(
                (item) => filter === "All projects" || item.category === filter,
              )
              .map((item) => (
                <article key={item.id} className="project-card">
                  <div className={`project-preview preview-${item.type}`}>
                    <div className="preview-topline">
                      <span>
                        <span className="mini-dot" />{" "}
                        {item.type === "sales"
                          ? "REVENUE OVERVIEW"
                          : item.type === "scatter"
                            ? "CUSTOMER CLUSTERS"
                            : "DELIVERY PERFORMANCE"}
                      </span>
                      <span>↗</span>
                    </div>
                    {item.type === "sales" ? (
                      <div className="preview-metric">
                        $758k <span>↗ 27.4%</span>
                      </div>
                    ) : (
                      <div className="preview-metric">
                        {item.type === "scatter" ? "3" : "84.6%"}{" "}
                        <span className="metric-context">
                          {item.type === "scatter"
                            ? "customer segments"
                            : "on-time deliveries"}
                        </span>
                      </div>
                    )}
                    <div className="preview-chart">
                      <PortfolioChart type={item.type} />
                    </div>
                    <div className="preview-foot">
                      <span>
                        {item.type === "sales"
                          ? "Monthly revenue"
                          : item.type === "scatter"
                            ? "Frequency × customer value"
                            : "Regional performance"}
                      </span>
                      <span>Sample data</span>
                    </div>
                  </div>
                  <div className="project-copy">
                    <div className="flex items-center justify-between mb-4">
                      <span className="project-number">/{item.number}</span>
                      <div className="flex gap-2 flex-wrap justify-end">
                        {item.tools.map((tool) => (
                          <span key={tool} className="tool-tag">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Button
                      variant="ghost"
                      className="project-open"
                      onClick={() => setProject(item)}
                    >
                      View case study <ArrowUpRight />
                    </Button>
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section id="about" className="about-band border-y border-border">
          <div className="portfolio-container about-grid">
            <div className="reveal">
              <p className="eyebrow">
                <span>02</span> A LITTLE ABOUT ME
              </p>
              <h2>
                Curious by nature.
                <br />
                <span className="text-muted-foreground">
                  Analytical by practice.
                </span>
              </h2>
              <div className="about-signature">
                Rakibul Islam Shawon <span>↗</span>
              </div>
            </div>
            <div className="reveal about-copy">
              <p>
                I’m Rakibul Islam Shawon, a data analyst who enjoys uncovering
                patterns, asking better questions, and making the complex feel
                simple.
              </p>
              <p>
                My focus is on the whole journey: from cleaning messy datasets
                and exploring the details to building thoughtful dashboards that
                bring the bigger picture into view.
              </p>
              <p className="about-motto">
                <span className="text-primary">↳</span> Less guesswork. More
                clarity.
              </p>
              <span className="text-xs text-muted-foreground">
                Sample biography · experience and credentials to be added.
              </span>
            </div>
          </div>
        </section>

        <section id="skills" className="section-space portfolio-container">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">
                <span>03</span> MY TOOLKIT
              </p>
              <h2>
                The right tools.
                <br />
                <span className="text-muted-foreground">
                  The right questions.
                </span>
              </h2>
            </div>
            <p className="section-description">
              From raw data to a clear narrative,
              <br />a toolkit built for every step.
            </p>
          </div>
          <div className="skill-grid reveal">
            {[
              {
                icon: Database,
                title: "Data wrangling",
                sub: "A reliable foundation",
                tools: "SQL · Python · Pandas · Excel",
                text: "Cleaning, transforming, and validating data so every insight starts on solid ground.",
              },
              {
                icon: BarChart3,
                title: "Visual storytelling",
                sub: "Clarity at a glance",
                tools: "Power BI · Tableau · Matplotlib",
                text: "Purposeful dashboards and visualizations that make important patterns easy to see.",
              },
              {
                icon: Code2,
                title: "Analytical thinking",
                sub: "Beyond the surface",
                tools: "EDA · Statistics · Segmentation",
                text: "Exploring the why behind the numbers and connecting findings to business questions.",
              },
            ].map((skill) => (
              <div key={skill.title} className="skill-item">
                <skill.icon size={24} className="text-primary" />
                <p className="skill-sub">{skill.sub}</p>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
                <span className="skill-tools">{skill.tools}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="data-lab-band border-y border-border">
          <div className="portfolio-container data-lab-grid">
            <div className="reveal">
              <p className="eyebrow">
                <span>04</span> A CLOSER LOOK
              </p>
              <h2>
                Numbers tell stories.
                <br />
                <span className="text-muted-foreground">
                  Here’s one of them.
                </span>
              </h2>
              <p className="lab-description">
                A year of retail revenue, a clear upward trend.
                <br />
                Small fluctuations. A bigger picture.
              </p>
              <div className="lab-legend">
                <span className="mini-dot" /> Revenue in USD · illustrative
                dataset
              </div>
            </div>
            <div className="lab-chart-tool reveal">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Annual revenue
                  </p>
                  <div className="lab-value">
                    {year === "2025" ? "$758,000" : "$553,340"}
                    <span>↗ 37.0%</span>
                  </div>
                </div>
                <label className="year-select">
                  <span className="sr-only">Revenue year</span>
                  <select
                    aria-label="Revenue year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                  <ChevronDown size={13} />
                </label>
              </div>
              <div className="lab-chart">
                <PortfolioChart type="lab" year={year} />
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="portfolio-container contact-section reveal"
        >
          <p className="eyebrow">
            <span>05</span> LET’S CONNECT
          </p>
          <div className="contact-heading">
            <h2>
              Have a question?
              <br />
              Let’s find the <span className="text-primary">answer.</span>
            </h2>
            <Button
              className="contact-arrow mint-button"
              aria-label="Start a conversation"
              onClick={() => setContact(true)}
            >
              <ArrowUpRight />
            </Button>
          </div>
          <div className="contact-bottom">
            <p>
              Open to data analyst roles, meaningful projects,
              <br />
              and conversations about what data can do.
              <p style={{ fontWeight: 900, color: "#8FE0C1" }}>
                Email: rishawon360@gmail.com
              </p>
            </p>

            <Button
              variant="link"
              className="contact-link"
              onClick={() => setContact(true)}
            >
              Start a conversation <ArrowUpRight />
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="portfolio-container footer-inner">
          <a href="#home" className="font-semibold text-base">
            shawon<span className="text-primary">.</span>
          </a>
          <span>© {new Date().getFullYear()} Rakibul Islam Shawon</span>
          <a href="#home" className="flex items-center gap-2">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      <Dialog
        open={project !== null}
        onOpenChange={(open) => {
          if (!open) setProject(null);
        }}
      >
        <DialogContent className="portfolio portfolio-modal sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          {project && (
            <>
              <DialogHeader>
                <p className="eyebrow">CASE STUDY / {project.number}</p>
                <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                <DialogDescription>{project.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span className="tool-tag" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
              <div className="modal-chart">
                <PortfolioChart type={`$${project.type}`.slice(1)} />
              </div>
              <p className="text-xs text-muted-foreground">
                Illustrative case study using sample data; not a verified client
                engagement.
              </p>
              {[
                { title: "The question", text: project.challenge },
                { title: "The approach", text: project.approach },
                { title: "The insight", text: project.insight },
              ].map((part) => (
                <div key={part.title}>
                  <h3 className="font-semibold mb-2">{part.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {part.text}
                  </p>
                </div>
              ))}
              <div>
                <h3 className="font-semibold mb-3">Deliverables</h3>
                {project.deliverables.map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-2 text-sm mb-2 text-muted-foreground"
                  >
                    <Check size={15} className="text-primary" />
                    {item}
                  </p>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={contact}
        onOpenChange={(open) => {
          setContact(open);
          if (!open) setSaved(false);
        }}
      >
        <DialogContent className="portfolio portfolio-modal sm:max-w-[480px]">
          <DialogHeader>
            <p className="eyebrow">LET’S CONNECT</p>
            <DialogTitle className="text-2xl">
              Start a conversation.
            </DialogTitle>
            <DialogDescription>
              Contact address pending · inquiries are saved locally, not sent.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              downloadText(
                "Inquiry-for-Shawon.txt",
                `To: Rakibul Islam Shawon\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}\n\nDraft inquiry — not sent. Contact details await confirmation.`,
              );
              setSaved(true);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="contact-name" className="form-label">
                Your name
              </label>
              <Input
                id="contact-name"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="form-label">
                Email address
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="form-label">
                What’s on your mind?
              </label>
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project or opportunity…"
                required
                rows={4}
              />
            </div>
            <Button type="submit" className="mint-button w-full">
              {saved ? <Check /> : <ArrowDownToLine />}
              {saved ? "Inquiry downloaded" : "Download inquiry"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
