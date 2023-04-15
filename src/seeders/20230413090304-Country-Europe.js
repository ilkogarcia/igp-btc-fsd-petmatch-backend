'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const countries = [
      { alpha2CountryCode: 'AT', alpha3CountryCode: 'AUT', numericCountryCode: '040', countryName: 'Austria', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'BE', alpha3CountryCode: 'BEL', numericCountryCode: '056', countryName: 'Belgium', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'BG', alpha3CountryCode: 'BGR', numericCountryCode: '100', countryName: 'Bulgaria', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'CY', alpha3CountryCode: 'CYP', numericCountryCode: '196', countryName: 'Cyprus', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'CZ', alpha3CountryCode: 'CZE', numericCountryCode: '203', countryName: 'Czech Republic', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'DE', alpha3CountryCode: 'DEU', numericCountryCode: '276', countryName: 'Germany', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'DK', alpha3CountryCode: 'DNK', numericCountryCode: '208', countryName: 'Denmark', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'EE', alpha3CountryCode: 'EST', numericCountryCode: '233', countryName: 'Estonia', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'ES', alpha3CountryCode: 'ESP', numericCountryCode: '724', countryName: 'Spain', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'FI', alpha3CountryCode: 'FIN', numericCountryCode: '246', countryName: 'Finland', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'FR', alpha3CountryCode: 'FRA', numericCountryCode: '250', countryName: 'France', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'GR', alpha3CountryCode: 'GRC', numericCountryCode: '300', countryName: 'Greece', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'HR', alpha3CountryCode: 'HRV', numericCountryCode: '191', countryName: 'Croatia', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'HU', alpha3CountryCode: 'HUN', numericCountryCode: '348', countryName: 'Hungary', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'IE', alpha3CountryCode: 'IRL', numericCountryCode: '372', countryName: 'Ireland', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'IT', alpha3CountryCode: 'ITA', numericCountryCode: '380', countryName: 'Italy', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'IS', alpha3CountryCode: 'ISL', numericCountryCode: '352', countryName: 'Iceland', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'LT', alpha3CountryCode: 'LTU', numericCountryCode: '440', countryName: 'Lithuania', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'LU', alpha3CountryCode: 'LUX', numericCountryCode: '442', countryName: 'Luxembourg', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'LV', alpha3CountryCode: 'LVA', numericCountryCode: '428', countryName: 'Latvia', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'MT', alpha3CountryCode: 'MLT', numericCountryCode: '470', countryName: 'Malta', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'NL', alpha3CountryCode: 'NLD', numericCountryCode: '528', countryName: 'Netherlands', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'NO', alpha3CountryCode: 'NOR', numericCountryCode: '578', countryName: 'Norway', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'PL', alpha3CountryCode: 'POL', numericCountryCode: '616', countryName: 'Poland', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'PT', alpha3CountryCode: 'PRT', numericCountryCode: '620', countryName: 'Portugal', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'RO', alpha3CountryCode: 'ROU', numericCountryCode: '642', countryName: 'Romania', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'SE', alpha3CountryCode: 'SWE', numericCountryCode: '752', countryName: 'Sweden', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'SI', alpha3CountryCode: 'SVN', numericCountryCode: '705', countryName: 'Slovenia', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'SK', alpha3CountryCode: 'SVK', numericCountryCode: '703', countryName: 'Slovakia', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'CH', alpha3CountryCode: 'CHE', numericCountryCode: '756', countryName: 'Switzerland', createdAt: new Date(), updatedAt: new Date() },
      { alpha2CountryCode: 'GB', alpha3CountryCode: 'GBR', numericCountryCode: '826', countryName: 'United Kingdom', createdAt: new Date(), updatedAt: new Date() }
    ]

    return queryInterface.bulkInsert('Countries', countries, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Countries', null, {})
  }
}
