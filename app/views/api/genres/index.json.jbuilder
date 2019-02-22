# app/views/api/genres/index.json.jbuilder

json.array!(@genres) do |genre|
  json.extract! genre, :id, :name
  json.url "/genres/#{genre.id}"
end
