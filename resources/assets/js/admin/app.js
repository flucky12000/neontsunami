import '../bootstrap';
import '../../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap';
import Rails from 'rails-ujs';
import 'selectize';

(function($) {
  Rails.start();

  if ($('input[name=slug]').length && $('input[name=title], input[name=name]').length) {
    $('input[name=title], input[name=name]').on('keyup', function() {
      let slug = $(this).val()
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');

      $('input[name=slug]').val(slug);
    });
  }

  $('input[name=tags]').selectize({
    plugins: ['remove_button'],
    persist: false,
    preload: true,
    valueField: 'name',
    labelField: 'name',
    searchField: 'name',
    create: function(input, callback) {
      $.post('/admin/tags', { name: input })
        .done(response => {
          callback({ 'value': response.name, 'text': response.name });
        });
    },
    load: function(query, callback) {
      $.getJSON('/admin/tags', { q: query }, response => callback(response));
    }
  });

  $('select[name=series_id]').selectize();
})(jQuery);
