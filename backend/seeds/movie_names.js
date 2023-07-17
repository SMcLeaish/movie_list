/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE movies CASCADE')
  await knex('movies').insert([
    {title: 'Mean Girls', director: 'Tina Fey', year: '2005'},
    {title: 'Hackers', director: 'Angelina Jolie', year:'1994'},
    {title: 'The Grey',director: 'Liam Neeson', year: '2008'},
    {title: 'Sunshine', director: 'Guy Ritchie', year: '2010'},
    {title: 'Ex Machina', director: 'Jimmy Stewart', year: '2016'}, 
  ]);
};
