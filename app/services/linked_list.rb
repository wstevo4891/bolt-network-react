# app/services/movies_list.rb

# Data structure for doubly linked list
class LinkedList
  attr_accessor :length, :head, :tail

  def initialize
    @length = 0
    @head = nil
    @tail = nil
  end

  def add(value)
    node = Node.new(value)

    if @length > 0
      @tail.next = node
      node.previous = @tail
    else
      @head = node
    end

    @tail = node
    @length += 1
  end

  def search_node_at(position)
    current_node = @head
    count = 1

    if @length.zero? || position < 1 || position > @length
      raise StandardError, 'Failure: non-existent node in this list'
    end

    while count < position
      current_node = current_node.next
      count += 1
    end

    current_node
  end

  def remove(position)
    current_node = @head
    count = 1

    # 1st use-case: an invalid position
    if @length.zero? || position < 1 || position > @length
      raise StandardError, 'Failure: non-existent node in this list'
    end

    # 2nd use-case: the first node is removed
    if position == 1
      @head = current_node.next

      # There is a second node
      if !@head
        @head.previous = nil

      # There is no second node
      else
        @tail = nil
      end

    # 3rd use-case: the last node is removed
    elsif position == @length
      @tail = @tail.previous
      @tail.next = nil

    # 4th use-case: a middle node is removed
    else
      while count < position
        current_node = current_node.next
        count += 1
      end

      before_node_to_delete = current_node.previous
      after_node_to_delete = current_node.next

      before_node_to_delete.next = after_node_to_delete
      after_node_to_delete.previous = before_node_to_delete

      @length -= 1

      Rails.logger.debug "\nNode was successfully removed\n"
    end
  end
end
