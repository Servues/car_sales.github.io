from flask import Flask, render_template, url_for
import os

app = Flask(__name__)

def get_car_images(car_brand):
    """Получает список изображений для указанного автомобиля"""
    images = []
    car_folder = os.path.join(app.static_folder, 'images', car_brand)
    
    try:
        if os.path.exists(car_folder):
            for filename in sorted(os.listdir(car_folder)):
                if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                    img_url = url_for('static', filename=f'images/{car_brand}/{filename}')
                    images.append(img_url)
    except Exception as e:
        app.logger.error(f"Ошибка загрузки изображений {car_brand}: {str(e)}")
    
    return images

@app.route('/')
def index():
    cars_data = {
        'auris': {
            'name': 'Toyota Auris',
            'images': get_car_images('Toyota_Auris'),
            'prices': {
                'market': '2 000 000 ₽',
                'order': '1 850 000 ₽',
                'full': '1 980 000 ₽'
            }
        },
        'hyundai': {
            'name': 'Hyundai Sonata',
            'images': get_car_images('Hyundai'),
            'prices': {
                'market': '1 900 000 ₽',
                'order': '1 700 000 ₽',
                'full': '1 850 000 ₽'
            }
        },
        'kia': {
            'name': 'Kia Sportage',
            'images': get_car_images('Kia'),
            'prices': {
                'market': '2 100 000 ₽',
                'order': '1 950 000 ₽',
                'full': '2 080 000 ₽'
            }
        }
    }
    
    return render_template('index.html', cars_data=cars_data)

if __name__ == '__main__':
    app.run(
        debug=True,
        extra_files=[
            './templates/**/*',
            './static/**/*'
        ],
        port=5000
    )