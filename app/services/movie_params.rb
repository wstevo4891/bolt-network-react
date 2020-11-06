# MovieParams Service

# Service for generating Movie params to use in seeds.rb script
class MovieParams
  # == Constants ==============================================================
  GENRE_IDS_MAP = {
    'Action' => 1,
    'Adventure' => 2,
    'Comedy' => 3,
    'Drama' => 4,
    'Animation' => 5,
    'Family' => 6,
    'Romance' => 7,
    'Fantasy' => 8,
    'Sci-Fi' => 9,
    'Horror' => 10
  }.freeze

  # == Class Methods ==========================================================
  def self.create(path)
    new(path).call
  end

  # == Instance Methods =======================================================
  def initialize(path)
    @movie = load_movie(path)
    @poster_file = poster_file_path(path)
    @slug = movie_slug(path)
  end

  def call
    build_movie_params
  end

  private

  def load_movie(path)
    YAML.load_file(Rails.root.join(path))
  end

  def poster_file_path(path)
    path[%r{/[\w-]+\.yml}].slice(1..-1).sub('.yml', '-poster.jpg')
  end

  def movie_slug(path)
    path[%r{/[\w-]+\.yml}].slice(1..-5)
  end

  def build_movie_params
    params = params_hash
    return params unless @movie['Banner']

    params[:remote_banner_url] = image_url(@movie['Banner'])
    params[:remote_logo_url] = image_url(@movie['Logo'])

    params
  end

  def params_hash
    {
      title: @movie['Title'],
      slug: @slug,
      year: @movie['Year'],
      rated: @movie['Rated'],
      release_date: @movie['Released'],
      run_time: @movie['Runtime'],
      directors: @movie['Director'].split(', '),
      writers: @movie['Writer'].split(', '),
      actors: @movie['Actors'].split(', '),
      plot: @movie['Plot'],
      remote_photo_url: image_url(@poster_file),
      poster: @movie['Poster'],
      ratings: @movie['Ratings'],
      genres_list: genres_short_list,
      genre_ids: genre_ids_array,
    }
  end

  def image_url(file)
    "https://bolt-network.s3-us-west-2.amazonaws.com/#{file}"
  end

  def genre_ids_array
    @movie['Genre'].split(', ').map { |name| GENRE_IDS_MAP[name] }
  end

  def genres_short_list
    @movie['Genre'].split(', ').take(3)
  end
end
