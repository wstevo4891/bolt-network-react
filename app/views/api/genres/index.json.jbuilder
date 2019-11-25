# app/views/api/genres/index.json.jbuilder

json.array!(@genres) do |genre|
  json.extract! genre, :id, :title, :slug
  json.url "/genres/#{genre.slug}"
end
