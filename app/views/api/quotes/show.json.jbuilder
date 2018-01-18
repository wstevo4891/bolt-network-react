# app/views/api/quotes/show.json.jbuilder
json.extract! @quote, :id, :text, :author, :next_id, :previous_id
