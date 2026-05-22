import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/portfolio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectVisual from "@/components/ProjectVisual";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ink text-paper">
      <Header />
      
      <section className="project-detail section-pad border-b border-paper/70">
        <div className="project-detail-back mb-8">
          <Link href="/#work" className="inline-flex items-center gap-2 text-[#00f5ff] hover:underline font-bold text-sm uppercase">
            <ArrowLeft size={16} />
            BACK_TO_SYSTEM
          </Link>
        </div>

        <div className="project-detail-grid grid gap-12 lg:grid-cols-[1fr_1fr] mt-8">
          <div>
            <p className="chip mb-4">{project.number}</p>
            <h1>{project.title}</h1>
            <p className="hero-lead mt-6">{project.type}</p>
            <div className="copy-block mt-8">
              <p>{project.description}</p>
              <p>{project.line}</p>
            </div>
            
            <div className="project-detail-meta mt-12 grid gap-6 border-t border-paper/70 pt-8 text-sm uppercase font-bold text-[#f4f1ea]/70">
              <div>
                <span className="text-[#00f5ff] block mb-1">ROLE</span>
                <p className="text-[#f4f1ea]">{project.role}</p>
              </div>
              <div>
                <span className="text-[#00f5ff] block mb-1">STACK_&_FOCUS</span>
                <p className="text-[#f4f1ea]">{project.stack}</p>
              </div>
              <div>
                <span className="text-[#00f5ff] block mb-1">KEY_FEATURES</span>
                <ul className="project-detail-list list-disc pl-5 mt-2 space-y-1 text-[#f4f1ea] normal-case font-normal text-base">
                  {project.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div>
             <div className="sticky top-32">
                <div className="project-detail-visual border-[3px] border-[#f4f1ea] shadow-[10px_10px_0_#ff4fea] bg-[#191919] p-4">
                   <ProjectVisual type={project.visual} />
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
