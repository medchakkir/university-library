import Link from "next/link";

const Home = async () => {
  return (
    <>
      {/* Hero Section */}
      <section className=" px-4 py-24 text-center text-light-100">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Your Gateway to Infinite Knowledge
          </h1>
          <p className="mb-8 text-lg text-light-500">
            Explore 10,000+ free e-books, audiobooks, and research
            papers—curated for curious minds.
          </p>
          <Link
            href="/library"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-dark-100 hover:bg-primary/80"
          >
            Browse Library
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className=" px-4 py-20 text-light-100">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-semibold">
            Why Choose Our Library?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "📚",
                title: "Offline Access",
                desc: "Download and read anytime, anywhere.",
              },
              {
                icon: "🔍",
                title: "Smart Search",
                desc: "Find books by title, author, or even topic.",
              },
              {
                icon: "📱",
                title: "Sync Across Devices",
                desc: "Start reading on one device, continue on another.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-dark-700 p-6 text-center shadow-sm"
              >
                <span className="mb-4 block text-4xl">{feature.icon}</span>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-light-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials + Stats */}
      <section className=" px-4 py-20 text-light-100">
        <div className="mx-auto max-w-6xl">
          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-semibold">
              What Readers Say
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  quote: "This library saved me hundreds on textbooks!",
                  author: "— Maria, Student",
                },
                {
                  quote: "The best collection of classics I’ve found online.",
                  author: "— James, Book Club",
                },
                {
                  quote: "It was a game-changer for my studies.",
                  author: "— John, University Student",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-dark-700 p-6 shadow-sm"
                >
                  <p className="mb-4 italic text-light-400">
                    &#34;{testimonial.quote}&#34;
                  </p>
                  <p className="text-light-500">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="text-center">
            <h2 className="mb-8 text-3xl font-semibold">Our Community</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { value: "10,000+", label: "Books Available" },
                { value: "50,000+", label: "Active Readers" },
                { value: "24/7", label: "Free Access" },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-light-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
