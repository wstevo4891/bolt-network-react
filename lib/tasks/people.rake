# Rake Tasks for people table

require 'services/people_yaml'

namespace :people do
  ##
  # rake people:yaml
  #
  desc 'Write YAML for seeding people table'
  task yaml: [:environment] do
    puts 'Generating YAML for people seeds...'
    PeopleYAML.write
  end
end
