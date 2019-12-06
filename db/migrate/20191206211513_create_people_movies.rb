class CreatePeopleMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :people_movies, id: false do |t|
      t.belongs_to :person, index: true
      t.belongs_to :movie, index: true
    end
  end
end
