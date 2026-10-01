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
          <p className="mt-3 text-sm font-medium">
            Developed by Tsiyon Abera
            </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Product Manager Accelerator
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The Product Manager Accelerator Program is designed to support 
            PM professionals through every stage of their careers. From students 
            looking for entry-level jobs to Directors looking to take on a leadership 
            role, our program has helped over hundreds of students fulfill 
            their career aspirations.
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