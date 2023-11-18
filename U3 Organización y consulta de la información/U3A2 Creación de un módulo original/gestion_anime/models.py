from odoo import api, models, fields


class Anime(models.Model):
    _name = 'gestion_anime.anime'
    _description = 'Clase para gestionar animes'

    nombre = fields.Char(string='Título del Anime', required=True)
    genero = fields.Char(string='Género')
    demografia = fields.Char(string='Demografía')
    lanzamiento = fields.Integer(string='Año de Lanzamiento')
    episodios_ids = fields.One2many('gestion_anime.episodio', 'anime_id', string='Episodios')
    total_episodios = fields.Integer(compute='_compute_total_episodios', store=True, string='Total de Episodios')
    
    @api.depends('episodios_ids')
    def _compute_total_episodios(self):
        for anime in self:
            anime.total_episodios = len(anime.episodios_ids)
            
class Episodio(models.Model):
    _name = 'gestion_anime.episodio'
    _description = 'Clase para gestionar los episodios del anime'

    titulo = fields.Char(string='Título del Episodio', required=True)
    duracion = fields.Float(string='Duración (min)')
    lanzamiento = fields.Date(string='Fecha de Lanzamiento')
    puntuacion = fields.Float(string='Puntuación')
    anime_id = fields.Many2one('gestion_anime.anime', string='Anime al que pertenece')