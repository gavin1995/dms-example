import moment from 'moment';

export const getPosition = (el) => {
  let xPosition = 0;
  let yPosition = 0;
  while (el) {
    if (el.tagName === "BODY") {
      const xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      const yScrollPos = el.scrollTop || document.documentElement.scrollTop;
      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
};

export const getParams = (search) => {
  if (!search) return {};
  const vars = search.substring(1).split('&');
  const queryString = {};
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    if (typeof queryString[key] === 'undefined') {
      queryString[key] = decodeURIComponent(value);
    } else if (typeof queryString[key] === 'string') {
      queryString[key] = [queryString[key], decodeURIComponent(value)];
    } else {
      queryString[key].push(decodeURIComponent(value));
    }
  }
  return queryString;
};

//过滤html标签
export function removeHtmlTag(text) {
  if(!text){
    return ''
  }
  return text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/<\/?[^>]*>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

export const rippleAnimation = (e, callback = null) => {
  const {target, pageX, pageY} = e;
  if (target.tagName === 'SPAN') {
    return;
  }
  const el = target;
  const circleEl = el.childNodes[0];
  // 获取父元素的位置
  const {x, y} = getPosition(el.parentNode);
  circleEl.style.left = `${pageX - x}px`;
  circleEl.style.top = `${pageY - y}px`;
  circleEl.classList.add('is-active');
  setTimeout(() => {
    circleEl.classList.remove('is-active');
  }, 500);
  if (callback) {
    callback();
  }
};

export const back2top = () => {
  const isWebkit = navigator.userAgent.toLowerCase().match(/webkit\/([\d.]+)/);
  const requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

  function step() {
    if (document.documentElement.scrollTop + document.body.scrollTop > 0) {
      if (isWebkit) {
        document.body.scrollTop -= 50;
      } else {
        document.documentElement.scrollTop -= 50;
      }
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
};

export const fixWeChatScrollBug = () => {
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollTop + 1);
    document.body.scrollTop >= 1 && window.scrollTo(0, document.body.scrollTop - 1);
  }, 10)
};

export const formatDatetime = (time, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(time).format(formatStr);
};
