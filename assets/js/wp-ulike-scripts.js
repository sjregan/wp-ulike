/**
 * WP ULike Plugin 3.0
 *
 * http://wordpress.org/plugins/wp-ulike/
 * https://github.com/Alimir/wp-ulike
 *
 */
jQuery(document).ready(function($) {
	//start WP ULike process
	$(document).on('click', '.wp_ulike_btn',function(e) {
		var type 	= $(this).data('ulike-type');
		var status 	= $(this).data('ulike-status');
		var id 		= $(this).data('ulike-id');
		var uclass 	= $(this).data('ulike-class');
		var p_class = $(e.target).closest( "a" ).parent();
		
		if(ulike_obj.notifications == 1) {
			var liked 	= ulike_obj.like_notice;
			var unliked = ulike_obj.unlike_notice;
			toastr.options = {
			  "closeButton": false,
			  "debug": false,
			  "newestOnTop": false,
			  "progressBar": false,
			  "positionClass": "toast-bottom-right",
			  "preventDuplicates": false,
			  "showDuration": "300",
			  "hideDuration": "1000",
			  "timeOut": "5000",
			  "extendedTimeOut": "1000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}		
		}
		
		if (id != '') {
			//start AJAX
			jQuery.ajax({
					type:'POST',
					cache: false,
					url: ulike_obj.ajaxurl,
					data:{
					action:'wp_ulike_process',
					id: id,
					type: type
			  },
			  beforeSend:function(){
					p_class.html('<a class="loading"><span>&hellip;</span></a>');
			  },			  
			  success: function(data) {
					var vardata = jQuery( data ).find( 'response_data' ).text();
					p_class.html(vardata);
			  }
			});
			//End Ajax
			e.preventDefault();
		}
	});
});