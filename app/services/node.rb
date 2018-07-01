# app/services/node.rb

# Data structure for linked list node
class Node
  attr_accessor :data, :previous, :next

  def initialize(data)
    @data = data
    @previous = nil
    @next = nil
  end
end
