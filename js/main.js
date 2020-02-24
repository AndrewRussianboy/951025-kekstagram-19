'use strict';

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getComments = function () {
  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  return comments[getRandomInt(0, comments.length)];
};

var getPicturesDescription = function (count) {
  var pictureDescriptions = [];
  for (var i = 0; i < count; i++) {
    pictureDescriptions.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание',
      likes: getRandomInt(15, 201),
      comments: getComments()
    });
  }
  return pictureDescriptions;
};

var pictureTemplate = document.querySelector('#picture').content;

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').content = picture.comments;
  pictureElement.querySelector('.picture__likes').content = picture.likes; // textContent

  return pictureElement;
};

var renderPictures = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }

  var picturesBlock = document.querySelector('.pictures');
  picturesBlock.appendChild(fragment);
};

var pictures = getPicturesDescription(25);
renderPictures(pictures);

document.querySelector('.big-picture').classList.remove('hidden');

var renderCard = function (picture) {
  document.querySelector('.big-picture__img img').src = picture.url;
  document.querySelector('.likes-count').textContent = picture.likes;
  document.querySelector('.comments-count').textContent = picture.comments.length;
  document.querySelector('.social__caption').textContent = picture.description;
  var commentsText = document.querySelectorAll('.social__text');
  for (var i = 0; i < commentsText.length; i++) {
    commentsText[i].textContent = picture.comments;
  }
};

renderCard(pictures[0]);

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
