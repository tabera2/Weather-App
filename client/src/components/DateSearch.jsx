import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

function DateSearch({ onSearch, apiError }) {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) =>{
    event.preventDefault();
    setError("");
     if (!location.trim() || !startDate || !endDate) {
    setError("Please enter a location, start date, and end date.");
    return;
    } 
      if (endDate < startDate) {
    setError("End date cannot be before start date.");
    return;
    }
    onSearch(location.trim(), startDate, endDate);
  };

  return (
    <section>
        <div className="mb-4">
        <h2 className="text-xl font-semibold">
            Weather by Date Range
        </h2>

        <p className="text-sm text-muted-foreground">
            Search weather for a specific location and date range.
        </p>
        </div>

        <Card>
        <CardContent className="py-6">
            <form
            onSubmit={handleSubmit}
            className="space-y-5"
            >
            <div>
                <label className="mb-2 block text-sm font-medium">
                Location
                </label>

                <Input
                type="text"
                value={location}
                onChange={(event) =>
                    setLocation(event.target.value)
                }
                placeholder="Enter a city"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                <label className="mb-2 block text-sm font-medium">
                    Start Date
                </label>

                <Input
                    type="date"
                    value={startDate}
                    onChange={(event) =>
                    setStartDate(event.target.value)
                    }
                />
                </div>

                <div>
                <label className="mb-2 block text-sm font-medium">
                    End Date
                </label>

                <Input
                    type="date"
                    value={endDate}
                    onChange={(event) =>
                    setEndDate(event.target.value)
                    }
                />
                </div>
            </div>

            {error && (
                <p className="text-sm text-destructive">
                {error}
                </p>
            )}
            {apiError && (
                <p className="text-sm text-destructive">
                {apiError}
                </p>
            )}

            <div className="flex justify-end">
                <Button type="submit">
                Search & Save
                </Button>
            </div>
            </form>
        </CardContent>
        </Card>
    </section>
);
}

export default DateSearch;