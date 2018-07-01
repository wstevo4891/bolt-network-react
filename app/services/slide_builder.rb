# app/services/slide_builder.rb

# Service for retrieving slides from a linked list
class SlideBuilder
  attr_reader :genre, :slide_length, :start, :position, :list

  def initialize(props = {})
    @genre = props[:genre]
    @slide_length = props[:slide_length]
    @start = props[:start]
    @position = props[:position]
    @list = build_linked_list
  end

  def call
    retrieve_slides
  end

  private

  def build_linked_list
    movies = Movie.where(genre: @genre)
    last = movies.length - 1
    list = LinkedList.new
    i = 1
    arr = []

    movies.each do |movie|
      arr.push(movie)

      if i < @slide_length
        i += 1
      else
        list.add(arr)
        arr = []
        i = 1
      end
    end

    list
  end

  def retrieve_slides
    slides = []

    if @start
      slides.concat(@list.head.data)
      slides.concat(@list.head.next.data)
      slides.push(list.head.next.next.data[0])
    else
      slides = build_next_slides
    end

    slides
  end

  def build_next_slides
    slides = []

    if position == 1
      slides.push(@list.tail.previous.data.last)
      slides.concat(@list.tail.data)
      slides.concat(@list.head.data)
      slides.concat(@list.head.next.data)
      slides.push(@list.head.next.next.data.last)

    elsif position == @list.length
      slides.push(@list.tail.previous.previous.last)
      slides.concat(@list.tail.previous.data)
      slides.concat(@list.tail.data)
      slides.concat(@list.head.data)
      slides.push(@list.head.next.data[0])

    else
      current = @list.searchNodeAt(position)

      if position == 2
        slides.push(@list.tail.last)
      else
        slides.push(current.previous.previous.last)
      end

      slides.concat(current.previous.data)
      slides.concat(current.data)
      slides.concat(current.next.data)

      if position == @list.length - 1
        slides.push(@list.head.data[0])
      else
        slides.push(current.next.next.data[0])
      end
    end

    slides
  end
end
