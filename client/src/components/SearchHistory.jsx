import { useState } from "react";
import { convertTemperature } from "../utils/convertUnits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getWeatherColor,
  getWeatherCondition,
} from "../utils/weatherCode";

function SearchHistory({ searches, onDelete, onUpdate, unit }) {
  const [editingId, setEditingId] = useState(null);
  const [editLocation, setEditLocation] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  const handleEdit = (search) => {
    setEditingId(search.id);
    setEditLocation(search.location_name);
    setEditStartDate(search.start_date);
    setEditEndDate(search.end_date);
  };

  const handleSave = async (id) => {
    if (!editLocation.trim() || !editStartDate || !editEndDate) {
      return;
    }

    if (editEndDate < editStartDate) {
      return;
    }

    await onUpdate(
      id,
      editLocation.trim(),
      editStartDate,
      editEndDate
    );

    setEditingId(null);
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Saved Weather
        </h2>

        <p className="text-sm text-muted-foreground">
          Your saved weather searches.
        </p>
      </div>

      {searches.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No saved weather searches yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {searches.map((search) => (
            <Card key={search.id}>
              {editingId === search.id ? (
                <CardContent className="py-6">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Location
                      </label>

                      <Input
                        type="text"
                        value={editLocation}
                        onChange={(event) =>
                          setEditLocation(event.target.value)
                        }
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Start Date
                        </label>

                        <Input
                          type="date"
                          value={editStartDate}
                          onChange={(event) =>
                            setEditStartDate(event.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          End Date
                        </label>

                        <Input
                          type="date"
                          value={editEndDate}
                          onChange={(event) =>
                            setEditEndDate(event.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>

                      <Button
                        onClick={() => handleSave(search.id)}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              ) : (
                <>
                  <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <CardTitle>
                          {search.location_name}
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {search.country}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {search.start_date} → {search.end_date}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {search.weather_data.time.map((date, index) => {
                        const weatherCode =
                          search.weather_data.weather_code[index];

                        const weatherColor =
                          getWeatherColor(weatherCode);

                        const condition =
                          getWeatherCondition(weatherCode);

                        return (
                          <div
                            key={date}
                            className={`rounded-lg border p-3 ${weatherColor}`}
                          >
                            <p className="text-sm font-medium">
                              {new Date(
                                date + "T00:00:00"
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>

                            <div className="my-3">
                              <span className="text-2xl">
                                {condition.icon}
                              </span>

                              <p className="mt-1 text-xs text-muted-foreground">
                                {condition.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                              <span className="font-semibold">
                                H{" "}
                                {convertTemperature(
                                  search.weather_data
                                    .temperature_2m_max[index],
                                  unit
                                )}
                                °
                              </span>

                              <span className="text-muted-foreground">
                                L{" "}
                                {convertTemperature(
                                  search.weather_data
                                    .temperature_2m_min[index],
                                  unit
                                )}
                                °
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(search)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() => onDelete(search.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchHistory;