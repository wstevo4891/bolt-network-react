class CreateMoviesPeople < ActiveRecord::Migration[5.2]
  def change
    create_table :movies_people, id: false do |t|
      t.belongs_to :movie, index: true
      t.belongs_to :person, index: true
    end
  end
end
