import { LandingPageService } from "../../services/landing-page-service";


export const PortfolioPreview =
    () => {
        const hero =
            LandingPageService.getHero();

        const skills =
            LandingPageService.getSkills();

        const projects =
            LandingPageService.getProjectSection();

        const experiences =
            LandingPageService.getExperiences();

        return (
            <div
                className="
          overflow-y-auto
          bg-gray-100

          dark:bg-black
        "
            >
                <div
                    className="
            mx-auto
            max-w-6xl

            p-8
          "
                >
                    {/* Preview Card */}
                    <div
                        className="
              overflow-hidden
              rounded-3xl

              bg-white
              shadow-xl

              dark:bg-gray-900
            "
                    >
                        {/* Hero */}
                        <section
                            className="
                border-b
                border-gray-200

                p-10

                dark:border-gray-800
              "
                        >
                            <span
                                className="
                  rounded-full

                  bg-violet-100

                  px-4 py-2

                  text-sm
                  font-medium

                  text-violet-700
                "
                            >
                                {hero.badge}
                            </span>

                            <h1
                                className="
                  mt-6

                  text-5xl
                  font-bold

                  text-slate-900

                  dark:text-white
                "
                            >
                                {hero.title.prefix}
                                <br />

                                <span
                                    className="
                    text-violet-600
                  "
                                >
                                    {
                                        hero.title
                                            .highlight
                                    }
                                </span>
                            </h1>

                            <p
                                className="
                  mt-4

                  text-lg

                  text-slate-600

                  dark:text-slate-400
                "
                            >
                                {
                                    hero.description
                                }
                            </p>
                        </section>

                        {/* Skills */}
                        <section className="p-10">
                            <h2
                                className="
                  mb-6

                  text-2xl
                  font-bold

                  text-slate-900
                  dark:text-white
                "
                            >
                                Skills
                            </h2>

                            <div
                                className="
                  grid gap-4
                  md:grid-cols-2
                "
                            >
                                {skills.categories.map(
                                    skill => (
                                        <div
                                            key={
                                                skill.category
                                            }
                                            className="
                        rounded-xl
                        border

                        p-5

                        dark:border-gray-700
                      "
                                        >
                                            <div
                                                className="
                          mb-3
                          flex
                          justify-between
                        "
                                            >
                                                <span>
                                                    {
                                                        skill.category
                                                    }
                                                </span>

                                                <span>
                                                    {
                                                        skill.score
                                                    }
                                                    %
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {skill.items.map(
                                                    item => (
                                                        <span
                                                            key={
                                                                item
                                                            }
                                                            className="
                                rounded-md

                                bg-violet-100

                                px-2 py-1

                                text-xs
                              "
                                                        >
                                                            {
                                                                item
                                                            }
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* Experience */}
                        <section className="p-10">
                            <h2
                                className="
                  mb-6

                  text-2xl
                  font-bold
                "
                            >
                                Experience
                            </h2>

                            {experiences.map(
                                (exp, index) => (
                                    <div
                                        key={`${exp.company}-${exp.role}-${index}`}
                                        className="
                      mb-6

                      border-l-4
                      border-violet-500

                      pl-5
                    "
                                    >
                                        <h3
                                            className="
                        text-lg
                        font-semibold
                      "
                                        >
                                            {exp.role}
                                        </h3>

                                        <p
                                            className="
                        text-sm
                        text-slate-500
                      "
                                        >
                                            {exp.company}
                                        </p>
                                    </div>
                                )
                            )}
                        </section>

                        {/* Projects */}
                        <section className="p-10">
                            <h2
                                className="
                  mb-6
                  text-2xl
                  font-bold
                "
                            >
                                Projects
                            </h2>

                            <div
                                className="
                  grid gap-4
                  md:grid-cols-2
                "
                            >
                                {projects.items.map(
                                    project => (
                                        <div
                                            key={
                                                project.title
                                            }
                                            className="
                        rounded-xl
                        border

                        p-5

                        dark:border-gray-700
                      "
                                        >
                                            <h3
                                                className="
                          font-semibold
                        "
                                            >
                                                {
                                                    project.title
                                                }
                                            </h3>

                                            <p
                                                className="
                          mt-2
                          text-sm
                          text-slate-500
                        "
                                            >
                                                {
                                                    project.description
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    };