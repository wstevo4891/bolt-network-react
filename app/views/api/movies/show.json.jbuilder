# frozen_string_literal: true

extractions = %i[id title poster rating runtime plot actors directors writers]

json.extract! @presenter, extractions

json.genres @presenter.genres_list

json.release_date @presenter.formatted_release_date

json.reviews @presenter.reviews_list

json.url @presenter.movie_url

json.year @presenter.year.to_s
