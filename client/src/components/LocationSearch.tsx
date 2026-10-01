import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LocationSearch({onSearch, onUseLocation}){
    const [input, setInput] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!input.trim()){
            return;
        }

        onSearch(input.trim());
    };

    return (
  <Card>
    <CardHeader>
      <CardTitle>Search Weather</CardTitle>
      <CardDescription>
        Search for a city or use your current location.
      </CardDescription>
    </CardHeader>

    <CardContent>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <Input
          type="text"
          placeholder="Enter city, ZIP code, or location"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1"
        />

        <Button type="submit">
          Search
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onUseLocation}
        >
          Use My Location
        </Button>
      </form>
    </CardContent>
  </Card>
);
}

export default LocationSearch;