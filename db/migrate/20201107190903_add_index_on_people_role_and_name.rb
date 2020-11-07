class AddIndexOnPeopleRoleAndName < ActiveRecord::Migration[5.2]
  def change
    add_index :people, %i[role name]
  end
end
