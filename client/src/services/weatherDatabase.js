import {supabase} from "./supabase";

export async function saveWeatherSearch(searchData){
  const { data, error } = await supabase
    .from("weather_searches")
    .insert(searchData)
    .select();

  if (error){
    throw new Error(error.message);
  }

  return data;
}

export async function getWeatherSearches(){
  const { data, error } = await supabase
    .from("weather_searches")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteWeatherSearch(id){
  const { error } = await supabase
    .from("weather_searches")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateWeatherSearch(id, updatedData){
  const { data, error } = await supabase
    .from("weather_searches")
    .update(updatedData)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}