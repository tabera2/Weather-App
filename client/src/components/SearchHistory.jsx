import { useState } from "react";
import { convertTemperature } from "../utils/convertUnits";

function SearchHistory({ searches, onDelete, onUpdate, unit }){
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
    <div>
      <h2>Search History</h2>

      {searches.length === 0 ? (
        <p>No saved weather searches.</p>
      ) : (
    searches.map((search) => (
    <div key={search.id}>

        {editingId === search.id ? (
        <div>
            <input
            type="text"
            value={editLocation}
            onChange={(event) =>
                setEditLocation(event.target.value)
            }
            />

            <input
            type="date"
            value={editStartDate}
            onChange={(event) =>
                setEditStartDate(event.target.value)
            }
            />

            <input
            type="date"
            value={editEndDate}
            onChange={(event) =>
                setEditEndDate(event.target.value)
            }
            />

            <button onClick={() => handleSave(search.id)}>
            Save
            </button>

            <button onClick={() => setEditingId(null)}>
            Cancel
            </button>
        </div>
        ) : (
        <div>
            <h3>{search.location_name}</h3>

            <p>{search.country}</p>

            <p>
            {search.start_date} to {search.end_date}
            </p>

            <div>
            {search.weather_data.time.map((date, index) => (
                <div key={date}>
                <p>
                    {date}: High{" "}{
                        convertTemperature(
                            search.weather_data.temperature_2m_max[index],
                            unit
                        )}
                        °{unit},

                    Low {" "}{
                        convertTemperature(
                            search.weather_data.temperature_2m_min[index],
                            unit
                        )
                    }°{unit},
                </p>
                </div>
            ))}
            </div>

            <button onClick={() => handleEdit(search)}>
            Edit
            </button>

            <button onClick={() => onDelete(search.id)}>
            Delete
            </button>
        </div>
        )}

    </div>
    ))
      )}
    </div>
  );
}

export default SearchHistory;