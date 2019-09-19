/**
 * @author xhb
 * @description 弹层加载层插件
 * 
 * */

	try {

		function NoticeFn() {
			this.layerVal = false;

			var markerLayer = $("<div>");
			markerLayer.css({
				"backgroundColor": "rgba(255,255,255,0.5)",
				"position": "fixed",
				"top": 0,
				"left": 0,
				"right": 0,
				"bottom": 0,
				"zIndex": 1000
			}).attr("class", "xhb_markerLayer");
			this.markerLayer = markerLayer;
		}

		//加载中
		NoticeFn.prototype.loading = function() {

			var loading = $("<img>");
			loading.attr({
				"src": "img/loadImg.gif",
				"class": "xhb_loading"
			}).css({
				"position": "absolute",
				"top": "50%",
				"left": "50%",
				"zIndex": 2000,
				"width": "100px",
				"height": "100px",
				"marginLeft": "-50px",
				"marginTop": "-50px"
			});

			$("body").append(this.markerLayer).append(loading);
			this.layerVal = true;
		}

		//关闭弹出层
		NoticeFn.prototype.closeLayer = function() {
			if(this.layerVal) {
				$(".xhb_markerLayer,.xhb_loading,.xhb_warning").remove();
			}
		}

		//打开温馨提示
		NoticeFn.prototype.warning = function(txt) {
			var warningMode = $("<div>");
			warningMode.attr("class", "xhb_warning").css({
				"position": "absolute",
				"top": "50%",
				"left": "50%",
				"zIndex": 2000,
				"width": "250px",
				"height": "150px",
				"marginLeft": "-125px",
				"marginTop": "-75px",
				"border": "1px solid #ddd",
				"borderRadius": "8px",
				"background": "#c9c9c9"
			});

			var title = $("<h4>");
			title.text("温馨提示").css({
				"padding": "10px 10px",
				"borderBottom": "1px solid #ddd",
				"margin": 0
			});

			var txtMode = $("<div>");
			if(txt == "" || txt === undefined || txt == null) {
				txt = "操作成功！";
			}
			txtMode.text(txt).css({
				"lineHeight": "75px",
				"textAlign": "center",
				"height": "75px",
				"width": "100%",
				"borderBottom": "1px solid #ddd"
			});

			var btnBox = $("<button>");
			btnBox.css({
					"display": "block",
					"width": "50px",
					"margin": "0 auto",
					"marginTop": "5px"
				}).text("确定")
				.attr("class", "xhb_closeLayer");

			warningMode.append(title).append(txtMode).append(btnBox);
			$("body").append(this.markerLayer).append(warningMode);
			this.layerVal = true;

			var _this = this;
			btnBox.on("click", function() {
				_this.closeLayer();
			});
		}

	} catch(e) {
		alert("请调用jquery脚本库")
	}
