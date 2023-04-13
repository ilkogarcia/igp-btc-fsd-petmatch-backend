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
      { alpha2CountryCode: 'IT', alpha3CountryCode: 'ITA', numericCountryCode: '380', countryName: 'Italy', createdAt: new Date(), updatedAt: new Date() }
    ]

    return queryInterface.bulkInsert('Country', countries, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Country', null, {})
  }
}
