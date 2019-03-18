import $ from 'jquery';

export class CountryProvinceSelector {
  constructor(countryElement, provinceElement) {
    this.countryElement = countryElement;
    this.provinceElement = provinceElement;

    this.countryElement.on('change', e => this.onChange(e));

    this.useCountry(countryElement.val());

    if(this.provinceElement.attr('data-value')) {
      //TODO: This may need error checking? e.g. if a selected province does not exist
      this.provinceElement.val(this.provinceElement.attr('data-value'));
    }
  }

  useCountry(country) {
    let isEmpty = !country || !country.length || country == '---';

    let provinces = [];
    if(!isEmpty) {
      let optionTag = this.countryElement.find('[value="'+country+'"]');
      provinces = JSON.parse(optionTag.attr('data-provinces'));
    };

    if(isEmpty || !provinces.length) {
      this.provinceElement.html('');
      this.provinceElement.addClass('is-hidden');
      this.provinceElement.closest('.o-form__input-group').addClass('is-hidden');
      return;
    }

    //Get the HTML
    let x = provinces.reduce((x,province) => {
      let [ value, name ] = province;
      return `${x}<option value="${value}">${name}</option>`;
    }, '');
    this.provinceElement.html(x);
    this.provinceElement.closest('.o-form__input-group').removeClass('is-hidden');
    this.provinceElement.removeClass('is-hidden');
  }

  onChange(e) {
    var self = $(e.currentTarget);
    let value = self.val();
    this.useCountry(value);
  }
}
