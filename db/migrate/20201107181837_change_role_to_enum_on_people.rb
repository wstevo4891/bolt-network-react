class ChangeRoleToEnumOnPeople < ActiveRecord::Migration[5.2]
  def change
    type_cast = 'integer USING CAST(role AS integer)'

    options = {
      null: false,
      default: 0
    }

    change_column :people, :role, type_cast, options
  end
end
