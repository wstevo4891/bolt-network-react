# frozen_string_literal: true

# Service for generating Movie params to use in seeds.rb script
class MovieParams
  # == Constants ==============================================================
  FILE_REGEX = %r{/[\w-]+\.yml}.freeze

  # == Attribute Methods ======================================================
  attr_reader :genres, :file, :movie, :params

  # == Class Methods ==========================================================
  def self.build(path, movie)
    new(path, movie).params
  end

  # == Instance Methods =======================================================
  def initialize(path, movie)
    @file = path[FILE_REGEX]
    @movie = movie
    @genres = movie['Genre'].split(', ')
    @params = {
      **base_params,
      **genre_params,
      **remote_url_params
    }
  end

  private

  def base_params
    {
      title: @movie['Title'],
      slug: @file.slice(1..-5),
      year: @movie['Year'],
      rating: @movie['Rated'],
      release_date: Date.parse(@movie['Released']),
      runtime: @movie['Runtime'].to_i,
      plot: @movie['Plot'],
      poster: @movie['Poster']
    }
  end

  def genre_params
    {
      genres_list: @genres.take(3),
      genre_ids: Genre.where(title: @genres).pluck(:id)
    }
  end

  def remote_url_params
    params_hash = { remote_photo_url: image_url(poster_file) }
    return params_hash unless @movie['Banner']

    params_hash.merge(banner_logo_remote_url_params)
  end

  def banner_logo_remote_url_params
    {
      remote_banner_url: image_url(@movie['Banner']),
      remote_logo_url: image_url(@movie['Logo'])
    }
  end

  def image_url(file_name)
    "https://bolt-network.s3-us-west-2.amazonaws.com/#{file_name}"
  end

  def poster_file
    @file.slice(1..-1).sub('.yml', '-poster.jpg')
  end
end
