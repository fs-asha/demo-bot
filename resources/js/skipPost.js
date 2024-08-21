$(document).ready(function(){

	
	
	getPostDetails();
	
	$('#skipPostForm').on('submit',function(e){
		e.preventDefault();
		savePost();
	});
	
	function savePost(){
		
		let page=$('#pageList').val();
		let postId=$('#postId').val();
		let postDesc=$('#postDesc').val();
		
		$.ajax({
			url:'saveSkipPost',
			method:'POST',
			contentType:'application/json',
			async:false,
			data:JSON.stringify({
				page:page,
				post_id:postId,
				post_desc:postDesc
			}),
			success:function(data){
				if(data===1){
					$('#skipPost_message').html('<h4 style="color:green">Post ID Saved Successfully!</h4>')
					getPostDetails();
				}else{
					$('#skipPost_message').html('<h4 style="color:red">Error in saving Post ID!</h4>')
				}
				
			},
			fail:function(xhr){
				$('#skipPost_message').html('<h4 style="color:red">Error in saving Post ID!</h4>')
			}
		});
	}
	
	function getPostDetails(){
		
		$('#idtable').show();
			
		$.ajax({
			url:'api/v1/skipPostDetails',
			method:'GET',
			data:'',
			success:function(data){
				var res=JSON.parse(data).result;
				let htmlText='';
				if(res.length==0){
					htmlText='No Data Avaialble';
				}else{
					res.forEach(function(e){
						htmlText+='<tr>'+
							'<td>'+e.seq+'</td>'+
							'<td>'+e.req_id+'</td>'+
							'<td>'+e.page+'</td>'+
							'<td>'+e.post_id+'</td>'+
							'<td>'+e.post_desc+'</td>'+
							'<td>'+e.added_time+'</td>'+
							'</tr>'
						
					});
				}
				
				
				
				$('#tblSkipPost').html(htmlText);
				
			},
			fail:function(xhr){
				
			}
		});
	}
	
	
});

