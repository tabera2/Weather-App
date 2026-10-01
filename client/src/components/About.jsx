import { Separator } from "@/components/ui/separator";

function About() {
  return (
    <section className="w-full">
      <Separator className="mb-8" />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">
            About Windy
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Windy is a weather application that allows users to search
            current weather conditions, view multi-day forecasts, search
            weather by date range, save and manage weather requests, and
            export saved weather data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Product Manager Accelerator
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The Product Manager Accelerator Program supports product
            management professionals at different stages of their careers,
            from students pursuing entry-level opportunities to experienced
            product leaders.
          </p>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Programs include PMA Pro, AI PM Bootcamp, PMA Power Skills,
            PMA Leader, resume reviews, and free product management
            training resources.
          </p>

          <a
            href="https://www.pmaccelerator.io/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-sky-600 hover:text-sky-700"
          >
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;