# frozen_string_literal: true

json.extract! @presenter, :id, :title, :poster, :rating, :runtime, :plot,
              :actors, :directors, :reviews, :writers

json.genres @presenter.genres_list

json.release_date @presenter.formatted_release_date

json.url @presenter.url

json.year @presenter.year.to_s
