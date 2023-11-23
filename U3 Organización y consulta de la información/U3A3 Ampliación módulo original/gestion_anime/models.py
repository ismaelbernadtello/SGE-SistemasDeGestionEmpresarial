from odoo import api, models, fields


class Anime(models.Model):
    _name = 'gestion_anime.anime'
    _description = 'Clase para gestionar animes'
    _rec_name = 'nombre'
    
    nombre = fields.Char(string='Nombre del Anime', required=True)
    genero = fields.Char(string='Género')
    demografia = fields.Char(string='Demografía')
    lanzamiento = fields.Integer(string='Año de Lanzamiento')
    
    #Tengo las 2 relaciones para poder probar a crear episodios con link y sin link para ver
    #Funcionalmente no tiene sentido, pero es para probar la herencia
    #De normal solo se usaria la relacion verepisodios_ids porque es la clase que hereda de episodio
    episodios_ids = fields.One2many('gestion_anime.episodio', 'anime_id', string='Episodios')
    verepisodio_ids = fields.One2many('gestion_anime.ver_episodio', 'anime_id', string='Ver Episodios')
    
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

    id = fields.Integer(string='Id del Episodio', required=True, readonly=True, default=lambda self: self._get_next_id())
    anime_id = fields.Many2one('gestion_anime.anime', string='Anime al que pertenece')
    titulo = fields.Char(string='Título del Episodio', required=True)
    duracion = fields.Float(string='Duración (min)')
    lanzamiento = fields.Date(string='Fecha de Lanzamiento')
    puntuacion = fields.Float(string='Puntuación')
    
    
class VerEpisodio(models.Model):
    _name = 'gestion_anime.ver_episodio'
    _description = 'Clase extendida para ver los episodios y encontrar su link'
    _inherit = 'gestion_anime.episodio'

    anime_id = fields.Many2one('gestion_anime.anime', string='Anime al que pertenece')
    link = fields.Char(string='Enlace para Ver el Episodio')
    idioma = fields.Char(string='Idioma del Episodio')