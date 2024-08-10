import requests

def get_animal_info(animal_name):
    try:
        # Wikipedia API to get a summary of the animal
        response = requests.get(f'https://en.wikipedia.org/api/rest_v1/page/summary/{animal_name}')
        if response.status_code == 200:
            data = response.json()
            return {
                'title': data.get('title'),
                'extract': data.get('extract'),
                'thumbnail': data.get('thumbnail', {}).get('source'),
                'url': data.get('content_urls', {}).get('desktop', {}).get('page')
            }
        else:
            return {'error': 'Animal info not found'}
    except Exception as e:
        return {'error': str(e)}