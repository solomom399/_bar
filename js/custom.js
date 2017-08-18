$(document).ready(function () {

	// var path = "https://savinglifesglobal.com.ng/lc_server/"
	var path = "http://localhost/lc_server/"

	var LC = function () {
		this.user = JSON.parse(localStorage.getItem('user_details'))
		this.displayUsersDetails = function () {
			var user_details_object = JSON.parse(localStorage.getItem('user_details'))
			$('.name').html('<i class="ti-user"></i> '+user_details_object.name)
			
			
		}

		this.load = function (text) {
			swal({
				title: '<div class="preloader-wrapper small active">'+
					    '<div class="spinner-layer spinner-red-only">'+
					      '<div class="circle-clipper left">'+
					        '<div class="circle"></div>'+
					      '</div><div class="gap-patch">'+
					        '<div class="circle"></div>'+
					      '</div><div class="circle-clipper right">'+
					        '<div class="circle"></div>'+
					      '</div>'+
					    '</div>'+
					  '</div>',
				text: text,
				html: true,
				showConfirmButton : false
			})
		}


		this.onBackKeyDown = function (e) {
			e.preventDefault();
		    var conf = confirm("Are you sure you want to exit this app")
		    if(conf){
		        navigator.app.exitApp();
		    } else {
		        alert('Enjoy yourself!');
		    }
		}


		this.success = function (text, callback) {
			swal({
				title: '',
				text: '<p>'+text+'</p>',
				html: true,
				type: 'success',
				confirmButtonClass : 'btn blue'
			},
			function () {
		        callback()
		    })
		}


		this.warn = function (text, callback) {
			swal({
				title: '',
				text: '<p>'+text+'</p>',
				html: true,
				type: 'warning',
				confirmButtonClass : 'btn red darken-4'
			},
			function () {
		        callback()
		    })
		}



		this.makeUse = function (formData, file_name, callback, errorCallback = null, type = 'JSON') {
			$.ajax({
				url: path+file_name,
				type: "POST",
				data: formData,
				cache: false,
			    processData: false,
			    contentType: false,
			    dataType: type,
				success: function(r) {
					callback(r)
				},
			    error: function(XMLHttpRequest, textStatus, errorThrown){
			        errorCallback(XMLHttpRequest, textStatus, errorThrown)
			    }
			})
		}


		this.search_people = function (search_query) {
			$(".friends_search_results").html(
				'<li class="center-align no-border"><div class="preloader-wrapper small active">'+
			    '<div class="spinner-layer spinner-red-only">'+
			      '<div class="circle-clipper left">'+
			        '<div class="circle"></div>'+
			      '</div><div class="gap-patch">'+
			        '<div class="circle"></div>'+
			      '</div><div class="circle-clipper right">'+
			        '<div class="circle"></div>'+
			      '</div>'+
			    '</div>'+
			  '</div></li>'
			)
			var formData = new FormData()
			formData.append('search_query', search_query)
			formData.append('key', 'find_friends')
			this.makeUse(formData, 'find-friend', function (resp) {
				if (resp.status != '0' && resp.status != 'empty') {
					var output = ''
					for (var i = 0; i < resp.entry.length; i++) {
						var hook = resp.entry[i]
						output += '<li class="col-md-12 no-p">'+
            							'<a href="" class="friends_list_a clearfix">'+
							                '<div class="pull-left">'+
							                    '<img src="../icon.png" class="friends_list_img">'+
							                    '<span class="friends_list_name">'+hook.surname+' '+hook.firstname+'</span>'+
							                '</div>'+
							                '<button class="btn btn-sm pull-right">add</button><i class="ti-angle-right pull-right friends_list_i"></i>'+
							            '</a>'+
							        '</li>'
					}

					
				} else {
					output = '<li class="col-md-12 no-p no-border">'+
							'<h4 class="center-align">No result found...</h4>'+
				        '</li>'
				}

				$(".friends_search_results").html(output)
			}, function (a, b, c) {
				console.log(a)
			})
		}
	}
	


	var LC = new LC()

	

	$(".hundred").css({
		'min-height': $(window).height()
	})


	$(".height-stay").css({
		'height': $(window).height()-157
	})

	$(".scan-btn").on('click', function () {
		
		cordova.plugins.barcodeScanner.scan(
	      	function (result) {
$(".console").html(JSON.stringify(result))
	          	alert("We got a barcode\n" +
	                "Result: " + result.text + "\n" +
	                "Format: " + result.format + "\n" +
	                "Cancelled: " + result.cancelled
	            );
	      	},
	      	function (error) {
	          	alert("Scanning failed: " + error);
	      	},
      {
 //         preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
  //        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
	   	)

	})

	

})
