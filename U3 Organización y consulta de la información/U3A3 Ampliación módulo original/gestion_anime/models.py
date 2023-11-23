from odoo import api, models, fields


class Anime(models.Model):
    _name = 'gestion_anime.anime'
    _description = 'Clase para gestionar animes'

    nombre = fields.Char(string='Título del Anime', required=True)
    genero = fields.Char(string='Género')
    demografia = fields.Char(string='Demografía')
    lanzamiento = fields.Integer(string='Año de Lanzamiento')
    episodios_ids = fields.One2many('gestion_anime.episodio', 'anime_id', string='Episodios')
    
    # Calcula el total de episodios que tiene el anime
    total_episodios = fields.Integer(compute='_compute_total_episodios', store=True, string='Total de Episodios')
    
    # Calcula la media de las puntuaciones de los episodios comprobando si existen episodios
    media_puntuacion = fields.Float(compute='_compute_media_puntuacion', store=True, string='Puntuación media de Episodios')
    
    @api.depends('episodios_ids')
    def _compute_total_episodios(self):
        for anime in self:
            anime.total_episodios = len(anime.episodios_ids)
    
    def _compute_media_puntuacion(self):
        for anime in self:
            if anime.episodios_ids:
                # Calcula la media de las puntuaciones de los episodios
                media_puntuacion = sum(episodio.puntuacion for episodio in anime.episodios_ids) / len(anime.episodios_ids)
                anime.media_puntuacion = media_puntuacion
            else:
                anime.media_puntuacion = 0.0
            
class Episodio(models.Model):
    _name = 'gestion_anime.episodio'
    _description = 'Clase para gestionar los episodios del anime'

    titulo = fields.Char(string='Título del Episodio', required=True)
    duracion = fields.Float(string='Duración (min)')
    lanzamiento = fields.Date(string='Fecha de Lanzamiento')
    puntuacion = fields.Float(string='Puntuación')
    anime_id = fields.Many2one('gestion_anime.anime', string='Anime al que pertenece')
    
    
    
class VerEpisodio(models.Model):
    _name = 'gestion_anime.ver_episodio'
    _description = 'Clase extendida para ver los episodios y encontrar su link'
    _inherit = 'gestion_anime.episodio'

    link = fields.Char(string='Enlace para Ver el Episodio')
    idioma = fields.Char(string='Idioma del Episodio')